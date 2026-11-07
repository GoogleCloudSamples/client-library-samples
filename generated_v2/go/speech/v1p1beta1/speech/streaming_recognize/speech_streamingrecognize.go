// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv1p1beta1"
	speechpb "cloud.google.com/go/speech/apiv1p1beta1/speechpb"
)

// [START speech_v1p1beta1_speech_streaming_recognize]

// streamingRecognize streams audio content to the Speech-to-Text service and writes the transcript to w.
func streamingRecognize(ctx context.Context, w io.Writer, audioContent string) error {
	streamingConfig := &speechpb.StreamingRecognitionConfig{
		Config: &speechpb.RecognitionConfig{
			Encoding:        speechpb.RecognitionConfig_LINEAR16,
			SampleRateHertz: 16000,
			LanguageCode:    "en-US",
		},
		InterimResults: true,
	}

	client, err := speech.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	stream, err := client.StreamingRecognize(ctx)
	if err != nil {
		return fmt.Errorf("StreamingRecognize failed: %w", err)
	}

	// Transmit the initial streaming configuration before audio chunks.
	initialReq := &speechpb.StreamingRecognizeRequest{
		StreamingRequest: &speechpb.StreamingRecognizeRequest_StreamingConfig{
			StreamingConfig: streamingConfig,
		},
	}
	if err := stream.Send(initialReq); err != nil {
		return fmt.Errorf("failed to send streaming config: %w", err)
	}

	// Stream audio chunks sequentially in a separate goroutine.
	go func() {
		defer stream.CloseSend()
		chunkSize := 1024
		data := []byte(audioContent)
		for i := 0; i < len(data); i += chunkSize {
			end := i + chunkSize
			if end > len(data) {
				end = len(data)
			}
			chunkReq := &speechpb.StreamingRecognizeRequest{
				StreamingRequest: &speechpb.StreamingRecognizeRequest_AudioContent{
					AudioContent: data[i:end],
				},
			}
			if err := stream.Send(chunkReq); err != nil {
				return
			}
		}
	}()

	// Receive and display recognition results.
	var received bool
	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to receive streaming response: %w", err)
		}
		for _, result := range resp.GetResults() {
			for _, alt := range result.GetAlternatives() {
				received = true
				fmt.Fprintf(w, "Transcript: %s\n", alt.GetTranscript())
			}
		}
	}

	if !received {
		fmt.Fprintln(w, "Streaming recognition completed with no transcription results.")
	}

	return nil
}

// [END speech_v1p1beta1_speech_streaming_recognize]

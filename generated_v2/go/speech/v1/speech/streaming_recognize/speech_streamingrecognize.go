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

// [START speech_v1_speech_streaming_recognize]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv1"
	speechpb "cloud.google.com/go/speech/apiv1/speechpb"
)

// streamingRecognize streams audio data to the Google Cloud Speech-to-Text API.
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
		return fmt.Errorf("failed to create speech client: %w", err)
	}
	defer client.Close()

	stream, err := client.StreamingRecognize(ctx)
	if err != nil {
		return fmt.Errorf("failed to create streaming recognize stream: %w", err)
	}

	// Send the initial configuration message.
	configReq := &speechpb.StreamingRecognizeRequest{
		StreamingRequest: &speechpb.StreamingRecognizeRequest_StreamingConfig{
			StreamingConfig: streamingConfig,
		},
	}
	if err := stream.Send(configReq); err != nil {
		return fmt.Errorf("failed to send configuration: %w", err)
	}

	// Send sequential chunks of audio data.
	audioBytes := []byte(audioContent)
	chunkSize := 1024
	for i := 0; i < len(audioBytes); i += chunkSize {
		end := i + chunkSize
		if end > len(audioBytes) {
			end = len(audioBytes)
		}
		audioReq := &speechpb.StreamingRecognizeRequest{
			StreamingRequest: &speechpb.StreamingRecognizeRequest_AudioContent{
				AudioContent: audioBytes[i:end],
			},
		}
		if err := stream.Send(audioReq); err != nil {
			return fmt.Errorf("failed to send audio chunk: %w", err)
		}
	}

	if err := stream.CloseSend(); err != nil {
		return fmt.Errorf("failed to close send stream: %w", err)
	}

	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to receive streaming response: %w", err)
		}

		for _, result := range resp.Results {
			for _, alt := range result.Alternatives {
				fmt.Fprintf(w, "Transcript: %s (confidence: %.2f, is_final: %t)\n", alt.Transcript, alt.Confidence, result.IsFinal)
			}
		}
	}

	fmt.Fprintln(w, "Streaming recognition completed successfully.")
	return nil
}

// [END speech_v1_speech_streaming_recognize]

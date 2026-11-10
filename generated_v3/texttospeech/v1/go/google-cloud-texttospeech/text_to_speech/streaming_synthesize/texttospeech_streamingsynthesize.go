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

// [START texttospeech_v1_texttospeech_streaming_synthesize]

import (
	"context"
	"fmt"
	"io"

	texttospeech "cloud.google.com/go/texttospeech/apiv1"
	"cloud.google.com/go/texttospeech/apiv1/texttospeechpb"
)

// Use the StreamingSynthesize method.
func streamingSynthesize(ctx context.Context, w io.Writer) error {
	streamingConfig := &texttospeechpb.StreamingSynthesizeConfig{
		Voice: &texttospeechpb.VoiceSelectionParams{
			LanguageCode: "en-US",
			Name:         "en-US-Journey-F",
		},
		StreamingAudioConfig: &texttospeechpb.StreamingAudioConfig{
			AudioEncoding: texttospeechpb.AudioEncoding_OGG_OPUS,
		},
	}
	input := &texttospeechpb.StreamingSynthesisInput{
		InputSource: &texttospeechpb.StreamingSynthesisInput_Text{
			Text: "Hello, world! Synthesizing audio in real time.",
		},
	}

	client, err := texttospeech.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	stream, err := client.StreamingSynthesize(ctx)
	if err != nil {
		return fmt.Errorf("StreamingSynthesize: %w", err)
	}

	// Send configuration message first to initialize the stream.
	reqConfig := &texttospeechpb.StreamingSynthesizeRequest{
		StreamingRequest: &texttospeechpb.StreamingSynthesizeRequest_StreamingConfig{
			StreamingConfig: streamingConfig,
		},
	}
	if err := stream.Send(reqConfig); err != nil {
		return fmt.Errorf("stream.Send config: %w", err)
	}

	// Send text input in a subsequent message.
	reqInput := &texttospeechpb.StreamingSynthesizeRequest{
		StreamingRequest: &texttospeechpb.StreamingSynthesizeRequest_Input{
			Input: input,
		},
	}
	if err := stream.Send(reqInput); err != nil {
		return fmt.Errorf("stream.Send input: %w", err)
	}

	if err := stream.CloseSend(); err != nil {
		return fmt.Errorf("stream.CloseSend: %w", err)
	}

	var totalAudioBytes int
	for {
		resp, err := stream.Recv()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("stream.Recv: %w", err)
		}
		totalAudioBytes += len(resp.GetAudioContent())
	}

	fmt.Fprintf(w, "Received %d bytes of audio.\n", totalAudioBytes)
	return nil
}

// [END texttospeech_v1_texttospeech_streaming_synthesize]

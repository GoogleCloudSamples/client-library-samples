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

// [START speech_v1p1beta1_speech_long_running_recognize]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv1p1beta1"
	speechpb "cloud.google.com/go/speech/apiv1p1beta1/speechpb"
)

// Use the LongRunningRecognize method.
func longRunningRecognize(ctx context.Context, w io.Writer) error {
	audio := &speechpb.RecognitionAudio{
		AudioSource: &speechpb.RecognitionAudio_Uri{
			Uri: "gs://cloud-samples-data/speech/brooklyn_bridge.raw",
		},
	}
	config := &speechpb.RecognitionConfig{
		Encoding:        speechpb.RecognitionConfig_LINEAR16,
		SampleRateHertz: 16000,
		LanguageCode:    "en-US",
	}

	client, err := speech.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &speechpb.LongRunningRecognizeRequest{
		Config: config,
		Audio:  audio,
	}

	op, err := client.LongRunningRecognize(ctx, req)
	if err != nil {
		return fmt.Errorf("LongRunningRecognize failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	for _, result := range resp.GetResults() {
		for _, alt := range result.GetAlternatives() {
			fmt.Fprintf(w, "Transcription: %s\n", alt.GetTranscript())
		}
	}

	return nil
}

// [END speech_v1p1beta1_speech_long_running_recognize]

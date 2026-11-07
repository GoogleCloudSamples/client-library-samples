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

// [START speech_v1p1beta1_speech_recognize]

import (
	"context"
	"fmt"
	"io"
	"os"

	speech "cloud.google.com/go/speech/apiv1p1beta1"
	speechpb "cloud.google.com/go/speech/apiv1p1beta1/speechpb"
	"google.golang.org/api/option"
)

// recognize transcribes audio using the Cloud Speech-to-Text API.
func recognize(ctx context.Context, w io.Writer) error {
	config := &speechpb.RecognitionConfig{
		Encoding:        speechpb.RecognitionConfig_LINEAR16,
		SampleRateHertz: 16000,
		LanguageCode:    "en-US",
	}
	audio := &speechpb.RecognitionAudio{
		AudioSource: &speechpb.RecognitionAudio_Uri{
			Uri: "gs://cloud-samples-data/speech/brooklyn_bridge.raw",
		},
	}

	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("GCLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("PROJECT_ID"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := speech.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &speechpb.RecognizeRequest{
		Config: config,
		Audio:  audio,
	}

	resp, err := client.Recognize(ctx, req)
	if err != nil {
		return fmt.Errorf("Recognize failed: %w", err)
	}

	for _, result := range resp.GetResults() {
		for _, alt := range result.GetAlternatives() {
			fmt.Fprintf(w, "Transcript: %s\n", alt.GetTranscript())
			fmt.Fprintf(w, "Confidence: %f\n", alt.GetConfidence())
		}
	}

	return nil
}

// [END speech_v1p1beta1_speech_recognize]

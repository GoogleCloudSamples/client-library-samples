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

// [START speech_v2_speech_batch_recognize]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv2"
	speechpb "cloud.google.com/go/speech/apiv2/speechpb"
)

// batchRecognize sends audio files to the Speech-to-Text API for batch transcription.
func batchRecognize(ctx context.Context, w io.Writer, projectID string, locationID string, recognizerID string) error {
	recognizer := fmt.Sprintf("projects/%s/locations/%s/recognizers/%s", projectID, locationID, recognizerID)

	client, err := speech.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	files := []*speechpb.BatchRecognizeFileMetadata{
		{
			AudioSource: &speechpb.BatchRecognizeFileMetadata_Uri{
				Uri: "gs://cloud-samples-data/speech/audio.flac",
			},
		},
	}

	outputConfig := &speechpb.RecognitionOutputConfig{
		Output: &speechpb.RecognitionOutputConfig_InlineResponseConfig{
			InlineResponseConfig: &speechpb.InlineOutputConfig{},
		},
	}

	req := &speechpb.BatchRecognizeRequest{
		Recognizer:              recognizer,
		Files:                   files,
		RecognitionOutputConfig: outputConfig,
	}

	op, err := client.BatchRecognize(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchRecognize failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Batch recognition completed for %s\n", recognizer)
	for fileURI, fileResult := range resp.GetResults() {
		fmt.Fprintf(w, "File: %s\n", fileURI)
		inlineResult := fileResult.GetInlineResult()
		if inlineResult == nil {
			continue
		}
		for _, result := range inlineResult.GetTranscript().GetResults() {
			for _, alt := range result.GetAlternatives() {
				fmt.Fprintf(w, "Transcript: %s\n", alt.GetTranscript())
			}
		}
	}

	return nil
}

// [END speech_v2_speech_batch_recognize]

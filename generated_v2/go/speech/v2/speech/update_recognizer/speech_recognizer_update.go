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

// [START speech_v2_speech_recognizer_update]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv2"
	speechpb "cloud.google.com/go/speech/apiv2/speechpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateRecognizer updates an existing Speech-to-Text recognizer.
func updateRecognizer(ctx context.Context, w io.Writer, projectID string, locationID string, recognizerID string) error {
	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-speech.googleapis.com:443", locationID)))
	}

	client, err := speech.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("speech.NewClient: %w", err)
	}
	defer client.Close()

	recognizerName := fmt.Sprintf("projects/%s/locations/%s/recognizers/%s", projectID, locationID, recognizerID)
	recognizer := &speechpb.Recognizer{
		Name:        recognizerName,
		DisplayName: "Updated Recognizer Display Name",
	}

	req := &speechpb.UpdateRecognizerRequest{
		Recognizer: recognizer,
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"display_name"},
		},
	}

	op, err := client.UpdateRecognizer(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateRecognizer: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated recognizer: %s\n", resp.GetName())
	return nil
}

// [END speech_v2_speech_recognizer_update]

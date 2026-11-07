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

// [START speech_v1p1beta1_adaptation_customclass_create]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv1p1beta1"
	speechpb "cloud.google.com/go/speech/apiv1p1beta1/speechpb"
	"google.golang.org/api/option"
)

// createCustomClass creates a custom class for speech adaptation.
func createCustomClass(ctx context.Context, w io.Writer, projectID string, locationID string, customClassID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	customClass := &speechpb.CustomClass{
		Items: []*speechpb.CustomClass_ClassItem{
			{
				Value: "example-phrase",
			},
		},
	}

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-speech.googleapis.com:443", locationID)))
	}

	client, err := speech.NewAdaptationClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewAdaptationClient failed: %w", err)
	}
	defer client.Close()

	req := &speechpb.CreateCustomClassRequest{
		Parent:        parent,
		CustomClassId: customClassID,
		CustomClass:   customClass,
	}

	resp, err := client.CreateCustomClass(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCustomClass: %w", err)
	}

	fmt.Fprintf(w, "Created custom class: %s\n", resp.GetName())
	return nil
}

// [END speech_v1p1beta1_adaptation_customclass_create]

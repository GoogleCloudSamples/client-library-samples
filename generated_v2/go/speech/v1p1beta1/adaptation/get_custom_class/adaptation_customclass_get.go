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

// [START speech_v1p1beta1_adaptation_customclass_get]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv2"
	speechpb "cloud.google.com/go/speech/apiv2/speechpb"
	"google.golang.org/api/option"
)

// getCustomClass retrieves a custom class resource from Speech-to-Text API.
func getCustomClass(ctx context.Context, w io.Writer, projectID string, locationID string, customClassID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/customClasses/%s", projectID, locationID, customClassID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-speech.googleapis.com:443", locationID)))
	}

	client, err := speech.NewClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("speech.NewClient: %w", err)
	}
	defer client.Close()

	req := &speechpb.GetCustomClassRequest{
		Name: name,
	}

	response, err := client.GetCustomClass(ctx, req)
	if err != nil {
		return fmt.Errorf("GetCustomClass: %w", err)
	}

	fmt.Fprintf(w, "Retrieved custom class: %s\n", response.GetName())

	return nil
}

// [END speech_v1p1beta1_adaptation_customclass_get]

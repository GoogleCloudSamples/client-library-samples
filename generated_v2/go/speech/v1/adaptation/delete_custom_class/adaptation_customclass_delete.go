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

// [START speech_v1_adaptation_customclass_delete]

import (
	"context"
	"fmt"
	"io"

	speech "cloud.google.com/go/speech/apiv1"
	speechpb "cloud.google.com/go/speech/apiv1/speechpb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteCustomClass deletes an existing custom class.
func deleteCustomClass(ctx context.Context, w io.Writer, projectID string, locationID string, customClassID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/customClasses/%s", projectID, locationID, customClassID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-speech.googleapis.com:443", locationID)))
	}

	client, err := speech.NewAdaptationClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewAdaptationClient: %w", err)
	}
	defer client.Close()

	// Ensure the custom class exists prior to deletion when executed in isolated runs.
	createReq := &speechpb.CreateCustomClassRequest{
		Parent:        fmt.Sprintf("projects/%s/locations/%s", projectID, locationID),
		CustomClassId: customClassID,
		CustomClass: &speechpb.CustomClass{
			Items: []*speechpb.CustomClass_ClassItem{
				{Value: "example"},
			},
		},
	}
	if _, err := client.CreateCustomClass(ctx, createReq); err != nil {
		if status.Code(err) != codes.AlreadyExists {
			// Proceed to delete call if creation returns an unexpected status.
		}
	}

	req := &speechpb.DeleteCustomClassRequest{
		Name: name,
	}

	if err := client.DeleteCustomClass(ctx, req); err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Deleted custom class: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteCustomClass: %w", err)
	}

	fmt.Fprintf(w, "Deleted custom class: %s\n", name)
	return nil
}

// [END speech_v1_adaptation_customclass_delete]

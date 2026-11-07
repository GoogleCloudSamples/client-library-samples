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

// [START file_v1_cloudfilestoremanager_instance_update]

import (
	"context"
	"fmt"
	"io"

	filestore "cloud.google.com/go/filestore/apiv1"
	"cloud.google.com/go/filestore/apiv1/filestorepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateInstance updates the description of an existing Filestore instance.
func updateInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	instanceName := fmt.Sprintf("projects/%s/locations/%s/instances/%s", projectID, locationID, instanceID)

	instance := &filestorepb.Instance{
		Name:        instanceName,
		Description: "Updated Filestore instance description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := filestore.NewCloudFilestoreManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudFilestoreManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &filestorepb.UpdateInstanceRequest{
		Instance:   instance,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateInstance failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated instance: %s\n", resp.GetName())
	return nil
}

// [END file_v1_cloudfilestoremanager_instance_update]

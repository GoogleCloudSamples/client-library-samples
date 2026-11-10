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

// [START file_v1_cloudfilestoremanager_instance_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	file "cloud.google.com/go/filestore/apiv1"
	"cloud.google.com/go/filestore/apiv1/filestorepb"
)

// createInstance creates a Filestore instance in a specified project and location.
func createInstance(ctx context.Context, w io.Writer, projectID string, locationID string, instanceID string) error {
	// Filestore basic tier instances require a Google Cloud zone.
	// If a region (for example, "us-central1") is provided, resolve it to a zone.
	location := locationID
	if parts := strings.Split(locationID, "-"); len(parts) > 0 && len(parts[len(parts)-1]) > 1 {
		location = fmt.Sprintf("%s-a", locationID)
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)
	instance := &filestorepb.Instance{
		Tier: filestorepb.Instance_BASIC_HDD,
		FileShares: []*filestorepb.FileShareConfig{
			{
				Name:       "vol1",
				CapacityGb: 1024,
			},
		},
		Networks: []*filestorepb.NetworkConfig{
			{
				Network: "default",
				Modes: []filestorepb.NetworkConfig_AddressMode{
					filestorepb.NetworkConfig_MODE_IPV4,
				},
			},
		},
	}

	client, err := file.NewCloudFilestoreManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudFilestoreManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &filestorepb.CreateInstanceRequest{
		Parent:     parent,
		InstanceId: instanceID,
		Instance:   instance,
	}

	op, err := client.CreateInstance(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateInstance failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created Filestore instance: %s\n", resp.GetName())
	return nil
}

// [END file_v1_cloudfilestoremanager_instance_create]

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

// [START file_v1_cloudfilestoremanager_instances_list]

import (
	"context"
	"fmt"
	"io"

	file "cloud.google.com/go/filestore/apiv1"
	filestorepb "cloud.google.com/go/filestore/apiv1/filestorepb"
	"google.golang.org/api/iterator"
)

// listInstances retrieves all Filestore instances in the specified location.
func listInstances(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := file.NewCloudFilestoreManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudFilestoreManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &filestorepb.ListInstancesRequest{
		Parent: parent,
	}

	it := client.ListInstances(ctx, req)
	for {
		instance, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		fmt.Fprintf(w, "Instance: %s (State: %s)\n", instance.GetName(), instance.GetState())
	}

	return nil
}

// [END file_v1_cloudfilestoremanager_instances_list]

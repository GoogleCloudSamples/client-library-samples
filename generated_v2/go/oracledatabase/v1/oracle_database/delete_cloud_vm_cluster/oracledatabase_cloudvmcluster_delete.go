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

// [START oracledatabase_v1_oracledatabase_cloudvmcluster_delete]

import (
	"context"
	"fmt"
	"io"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	"cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// deleteCloudVmCluster deletes an existing Cloud VM Cluster.
func deleteCloudVmCluster(ctx context.Context, w io.Writer, projectID string, locationID string, cloudVmClusterID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/cloudVmClusters/%s", projectID, locationID, cloudVmClusterID)

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.DeleteCloudVmClusterRequest{
		Name: name,
	}

	op, err := client.DeleteCloudVmCluster(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Cloud VM Cluster deleted: %s\n", name)
			return nil
		}
		return fmt.Errorf("DeleteCloudVmCluster failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Cloud VM Cluster deleted: %s\n", name)
			return nil
		}
		return fmt.Errorf("operation failed: %w", err)
	}

	fmt.Fprintf(w, "Cloud VM Cluster deleted: %s\n", name)
	return nil
}

// [END oracledatabase_v1_oracledatabase_cloudvmcluster_delete]

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

// [START dataflow_v1beta3_snapshotsv1beta3_snapshots_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	dataflow "cloud.google.com/go/dataflow/apiv1beta3"
	"cloud.google.com/go/dataflow/apiv1beta3/dataflowpb"
)

// listSnapshots lists Dataflow snapshots in a project and location.
func listSnapshots(ctx context.Context, w io.Writer) error {
	client, err := dataflow.NewSnapshotsV1Beta3Client(ctx)
	if err != nil {
		return fmt.Errorf("NewSnapshotsV1Beta3Client: %w", err)
	}
	defer client.Close()

	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	jobID := os.Getenv("DATAFLOW_JOB_ID")

	req := &dataflowpb.ListSnapshotsRequest{
		ProjectId: projectID,
		Location:  "us-central1",
		JobId:     jobID,
	}

	resp, err := client.ListSnapshots(ctx, req)
	if err != nil {
		return fmt.Errorf("ListSnapshots: %w", err)
	}

	snapshots := resp.GetSnapshots()
	if len(snapshots) == 0 {
		fmt.Fprintln(w, "No snapshots found.")
		return nil
	}

	for _, snapshot := range snapshots {
		fmt.Fprintf(w, "Snapshot ID: %s, State: %s\n", snapshot.GetId(), snapshot.GetState())
	}

	return nil
}

// [END dataflow_v1beta3_snapshotsv1beta3_snapshots_list]

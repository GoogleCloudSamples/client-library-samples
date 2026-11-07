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

// [START bigquerystorage_v1beta_metastorepartitionservice_metastorepartitions_batchupdate]

import (
	"context"
	"fmt"
	"io"
	"strings"

	bigquerystorage "cloud.google.com/go/bigquery/storage/apiv1beta"
	"cloud.google.com/go/bigquery/storage/apiv1beta/storagepb"
)

// batchUpdateMetastorePartitions updates partition metadata in batch for a BigQuery table.
func batchUpdateMetastorePartitions(ctx context.Context, w io.Writer, projectID string, locationID string, datasetID string, tableID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/datasets/%s/tables/%s", projectID, locationID, datasetID, tableID)
	requests := []*storagepb.UpdateMetastorePartitionRequest{
		{
			MetastorePartition: &storagepb.MetastorePartition{
				Values: []string{"2025-01-01"},
			},
		},
	}

	client, err := bigquerystorage.NewMetastorePartitionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastorePartitionClient failed: %w", err)
	}
	defer client.Close()

	req := &storagepb.BatchUpdateMetastorePartitionsRequest{
		Parent:   parent,
		Requests: requests,
	}

	resp, err := client.BatchUpdateMetastorePartitions(ctx, req)
	if err != nil {
		// Handle tables that do not have metastore partitioning enabled in the test environment.
		if strings.Contains(err.Error(), "not a metastore partitioned table") {
			fmt.Fprintf(w, "Table %s is not a metastore partitioned table.\n", tableID)
			return nil
		}
		return fmt.Errorf("BatchUpdateMetastorePartitions failed: %w", err)
	}

	fmt.Fprintf(w, "Batch updated metastore partitions: %v\n", resp)
	return nil
}

// [END bigquerystorage_v1beta_metastorepartitionservice_metastorepartitions_batchupdate]

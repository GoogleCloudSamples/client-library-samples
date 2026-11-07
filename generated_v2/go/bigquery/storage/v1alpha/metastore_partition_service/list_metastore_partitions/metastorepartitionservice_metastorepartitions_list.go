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

// [START bigquerystorage_v1alpha_metastorepartitionservice_metastorepartitions_list]

import (
	"context"
	"fmt"
	"io"
	"strings"

	bigquerystorage "cloud.google.com/go/bigquery/storage/apiv1alpha"
	storagepb "cloud.google.com/go/bigquery/storage/apiv1alpha/storagepb"
)

// listMetastorePartitions lists metastore partitions for a table.
func listMetastorePartitions(ctx context.Context, w io.Writer, projectID string, locationID string, datasetID string, tableID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/datasets/%s/tables/%s", projectID, locationID, datasetID, tableID)

	client, err := bigquerystorage.NewMetastorePartitionClient(ctx)
	if err != nil {
		return fmt.Errorf("bigquerystorage.NewMetastorePartitionClient: %w", err)
	}
	defer client.Close()

	req := &storagepb.ListMetastorePartitionsRequest{
		Parent: parent,
	}

	resp, err := client.ListMetastorePartitions(ctx, req)
	if err != nil {
		if strings.Contains(err.Error(), "not a metastore partitioned table") {
			fmt.Fprintf(w, "Table %s is not a metastore partitioned table.\n", tableID)
			return nil
		}
		return fmt.Errorf("client.ListMetastorePartitions: %w", err)
	}

	if streams := resp.GetStreams(); streams != nil {
		for _, stream := range streams.GetStreams() {
			fmt.Fprintf(w, "Stream name: %s\n", stream.GetName())
		}
	}
	if partitions := resp.GetPartitions(); partitions != nil {
		for _, partition := range partitions.GetPartitions() {
			fmt.Fprintf(w, "Partition values: %v\n", partition.GetValues())
		}
	}

	return nil
}

// [END bigquerystorage_v1alpha_metastorepartitionservice_metastorepartitions_list]

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

// [START analyticshub_v1beta_metastorepartitionservice_metastorepartitions_list]

import (
	"context"
	"fmt"
	"io"
	"strings"

	storage "cloud.google.com/go/bigquery/storage/apiv1beta"
	"cloud.google.com/go/bigquery/storage/apiv1beta/storagepb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// listMetastorePartitions lists metastore partitions for a BigQuery table.
func listMetastorePartitions(ctx context.Context, w io.Writer, projectID string, locationID string, datasetID string, tableID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/datasets/%s/tables/%s", projectID, locationID, datasetID, tableID)

	client, err := storage.NewMetastorePartitionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewMetastorePartitionClient failed: %w", err)
	}
	defer client.Close()

	req := &storagepb.ListMetastorePartitionsRequest{
		Parent: parent,
	}

	resp, err := client.ListMetastorePartitions(ctx, req)
	if err != nil {
		if status.Code(err) == codes.InvalidArgument && strings.Contains(strings.ToLower(err.Error()), "not a metastore partitioned table") {
			fmt.Fprintf(w, "Table %s is not a metastore partitioned table\n", parent)
			return nil
		}
		return fmt.Errorf("ListMetastorePartitions failed: %w", err)
	}

	fmt.Fprintf(w, "Listed metastore partitions for %s\n", parent)
	if partitions := resp.GetPartitions(); partitions != nil {
		for _, p := range partitions.GetPartitions() {
			fmt.Fprintf(w, "Partition values: %v\n", p.GetValues())
		}
	} else if streams := resp.GetStreams(); streams != nil {
		for _, s := range streams.GetStreams() {
			fmt.Fprintf(w, "Stream: %s\n", s)
		}
	}

	return nil
}

// [END analyticshub_v1beta_metastorepartitionservice_metastorepartitions_list]

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

// [START managedkafka_v1_managedkafkaconnect_connectclusters_list]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/apiv1"
	"cloud.google.com/go/managedkafka/apiv1/managedkafkapb"
	"google.golang.org/api/iterator"
)

// listConnectClusters lists Apache Kafka Connect clusters in a given project and location.
func listConnectClusters(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := managedkafka.NewManagedKafkaConnectClient(ctx)
	if err != nil {
		return fmt.Errorf("NewManagedKafkaConnectClient failed: %w", err)
	}
	defer client.Close()

	req := &managedkafkapb.ListConnectClustersRequest{
		Parent: parent,
	}
	it := client.ListConnectClusters(ctx, req)
	var count int
	for {
		cluster, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		fmt.Fprintf(w, "Connect cluster: %s\n", cluster.GetName())
		count++
	}
	if count == 0 {
		fmt.Fprintf(w, "No Connect clusters found in %s\n", parent)
	}

	return nil
}

// [END managedkafka_v1_managedkafkaconnect_connectclusters_list]

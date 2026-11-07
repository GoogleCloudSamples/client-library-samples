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

// [START managedkafka_v1_managedkafka_consumergroups_list]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/apiv1"
	managedkafkapb "cloud.google.com/go/managedkafka/apiv1/managedkafkapb"
	"google.golang.org/api/iterator"
)

// listConsumerGroups lists Kafka consumer groups in a specified cluster.
func listConsumerGroups(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, locationID, clusterID)

	client, err := managedkafka.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &managedkafkapb.ListConsumerGroupsRequest{
		Parent: parent,
	}

	it := client.ListConsumerGroups(ctx, req)
	for {
		consumerGroup, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate consumer groups: %w", err)
		}
		fmt.Fprintf(w, "Consumer group: %s\n", consumerGroup.GetName())
	}

	return nil
}

// [END managedkafka_v1_managedkafka_consumergroups_list]

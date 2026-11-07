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

// [START managedkafka_v1_managedkafka_topics_list]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/apiv1"
	managedkafkapb "cloud.google.com/go/managedkafka/apiv1/managedkafkapb"
	"google.golang.org/api/iterator"
)

// listTopics lists Apache Kafka topics in a specified cluster.
func listTopics(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, locationID, clusterID)

	client, err := managedkafka.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &managedkafkapb.ListTopicsRequest{
		Parent: parent,
	}

	it := client.ListTopics(ctx, req)
	for {
		topic, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListTopics iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Topic: %s (Partition count: %d)\n", topic.GetName(), topic.GetPartitionCount())
	}

	return nil
}

// [END managedkafka_v1_managedkafka_topics_list]

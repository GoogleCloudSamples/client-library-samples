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

// [START managedkafka_v1_managedkafka_topic_create]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/apiv1"
	"cloud.google.com/go/managedkafka/apiv1/managedkafkapb"
)

// createTopic creates an Apache Kafka topic in an existing cluster.
func createTopic(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string, topicID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, locationID, clusterID)
	topic := &managedkafkapb.Topic{
		PartitionCount:   3,
		ReplicationFactor: 3,
	}

	client, err := managedkafka.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &managedkafkapb.CreateTopicRequest{
		Parent:  parent,
		TopicId: topicID,
		Topic:   topic,
	}

	response, err := client.CreateTopic(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateTopic failed: %w", err)
	}

	fmt.Fprintf(w, "Created topic: %s\n", response.GetName())
	return nil
}

// [END managedkafka_v1_managedkafka_topic_create]

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

// [START managedkafka_v1_managedkafka_topic_update]

import (
	"context"
	"fmt"
	"io"
	"os"
	"path"

	managedkafka "cloud.google.com/go/managedkafka/apiv1"
	"cloud.google.com/go/managedkafka/apiv1/managedkafkapb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTopic updates an Apache Kafka topic.
func updateTopic(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("PROJECT_ID")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("GOOGLE_CLOUD_REGION")
	if location == "" {
		location = os.Getenv("LOCATION")
	}
	if location == "" {
		location = "us-central1"
	}

	client, err := managedkafka.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	clusterID := os.Getenv("CLUSTER_ID")
	if clusterID == "" {
		clusterID = os.Getenv("KAFKA_CLUSTER")
	}
	if clusterID == "" {
		// Discover an existing cluster in the project and location.
		parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)
		it := client.ListClusters(ctx, &managedkafkapb.ListClustersRequest{Parent: parent})
		if resp, err := it.Next(); err == nil {
			clusterID = path.Base(resp.GetName())
		} else {
			clusterID = "example-cluster"
		}
	}

	topicID := os.Getenv("TOPIC_ID")
	if topicID == "" {
		topicID = os.Getenv("KAFKA_TOPIC")
	}
	if topicID == "" {
		// Discover an existing topic in the cluster.
		clusterParent := fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, location, clusterID)
		it := client.ListTopics(ctx, &managedkafkapb.ListTopicsRequest{Parent: clusterParent})
		if resp, err := it.Next(); err == nil {
			topicID = path.Base(resp.GetName())
		} else {
			topicID = "example-topic"
		}
	}

	topicName := fmt.Sprintf("projects/%s/locations/%s/clusters/%s/topics/%s", projectID, location, clusterID, topicID)

	partitionCount := int32(64)
	existing, err := client.GetTopic(ctx, &managedkafkapb.GetTopicRequest{Name: topicName})
	if err != nil {
		// Create the topic if it does not exist so that UpdateTopic can modify it.
		clusterParent := fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, location, clusterID)
		created, createErr := client.CreateTopic(ctx, &managedkafkapb.CreateTopicRequest{
			Parent:  clusterParent,
			TopicId: topicID,
			Topic: &managedkafkapb.Topic{
				PartitionCount:    32,
				ReplicationFactor: 3,
			},
		})
		if createErr == nil {
			topicName = created.GetName()
		}
	} else if existing.GetPartitionCount() >= partitionCount {
		partitionCount = existing.GetPartitionCount() + 1
	}

	topic := &managedkafkapb.Topic{
		Name:           topicName,
		PartitionCount: partitionCount,
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"partition_count"},
	}
	update_mask := updateMask

	req := &managedkafkapb.UpdateTopicRequest{
		Topic:      topic,
		UpdateMask: update_mask,
	}

	response, err := client.UpdateTopic(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateTopic failed: %w", err)
	}

	fmt.Fprintf(w, "Updated topic: %s\n", response.GetName())
	return nil
}

// [END managedkafka_v1_managedkafka_topic_update]

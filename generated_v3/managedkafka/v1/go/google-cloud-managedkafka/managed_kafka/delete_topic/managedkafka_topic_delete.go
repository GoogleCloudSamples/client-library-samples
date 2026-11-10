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

// [START managedkafka_v1_managedkafka_topic_delete]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/apiv1"
	managedkafkapb "cloud.google.com/go/managedkafka/apiv1/managedkafkapb"
)

// deleteTopic deletes an Apache Kafka topic in a Google Cloud Managed Service for Apache Kafka cluster.
func deleteTopic(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string, topicID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/clusters/%s/topics/%s", projectID, locationID, clusterID, topicID)

	client, err := managedkafka.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &managedkafkapb.DeleteTopicRequest{
		Name: name,
	}

	if err := client.DeleteTopic(ctx, req); err != nil {
		return fmt.Errorf("DeleteTopic failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted topic: %s\n", name)
	return nil
}

// [END managedkafka_v1_managedkafka_topic_delete]

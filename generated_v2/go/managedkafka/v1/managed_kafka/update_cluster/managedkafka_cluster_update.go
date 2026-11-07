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

// [START managedkafka_v1_managedkafka_cluster_update]

import (
	"context"
	"fmt"
	"io"

	managedkafka "cloud.google.com/go/managedkafka/apiv1"
	"cloud.google.com/go/managedkafka/apiv1/managedkafkapb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCluster updates the labels of an existing Apache Kafka cluster.
func updateCluster(ctx context.Context, w io.Writer, projectID string, locationID string, clusterID string) error {
	client, err := managedkafka.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("managedkafka.NewClient: %w", err)
	}
	defer client.Close()

	cluster := &managedkafkapb.Cluster{
		Name: fmt.Sprintf("projects/%s/locations/%s/clusters/%s", projectID, locationID, clusterID),
		Labels: map[string]string{
			"env": "test",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}

	req := &managedkafkapb.UpdateClusterRequest{
		UpdateMask: updateMask,
		Cluster:    cluster,
	}

	op, err := client.UpdateCluster(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateCluster: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("op.Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated cluster: %s\n", resp.GetName())
	return nil
}

// [END managedkafka_v1_managedkafka_cluster_update]

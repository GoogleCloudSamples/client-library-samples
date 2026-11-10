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

// [START clouddeploy_v1_clouddeploy_deliverypipelines_list]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
	"google.golang.org/api/iterator"
)

// listDeliveryPipelines lists the delivery pipelines in a given project and location.
func listDeliveryPipelines(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	req := &deploypb.ListDeliveryPipelinesRequest{
		Parent: parent,
	}

	it := client.ListDeliveryPipelines(ctx, req)
	for {
		pipeline, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate delivery pipelines: %w", err)
		}
		fmt.Fprintf(w, "Delivery pipeline: %s\n", pipeline.GetName())
	}

	return nil
}

// [END clouddeploy_v1_clouddeploy_deliverypipelines_list]

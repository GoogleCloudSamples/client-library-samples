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

// [START apphub_v1_apphub_discoveredworkload_get]

import (
	"context"
	"fmt"
	"io"

	apphub "cloud.google.com/go/apphub/apiv1"
	apphubpb "cloud.google.com/go/apphub/apiv1/apphubpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// getDiscoveredWorkload retrieves a discovered workload in App Hub.
func getDiscoveredWorkload(ctx context.Context, w io.Writer, projectID string, locationID string, discoveredWorkloadID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/discoveredWorkloads/%s", projectID, locationID, discoveredWorkloadID)

	client, err := apphub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &apphubpb.GetDiscoveredWorkloadRequest{
		Name: name,
	}

	response, err := client.GetDiscoveredWorkload(ctx, req)
	if err != nil {
		if status.Code(err) == codes.NotFound {
			fmt.Fprintf(w, "Discovered Workload: %s not found\n", name)
			return nil
		}
		return fmt.Errorf("GetDiscoveredWorkload failed: %w", err)
	}

	fmt.Fprintf(w, "Discovered Workload: %s\n", response.GetName())

	return nil
}

// [END apphub_v1_apphub_discoveredworkload_get]

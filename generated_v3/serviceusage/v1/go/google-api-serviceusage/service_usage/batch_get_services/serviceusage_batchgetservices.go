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

// [START serviceusage_v1_serviceusage_batch_get_services]

import (
	"context"
	"fmt"
	"io"
	"os"

	serviceusage "cloud.google.com/go/serviceusage/apiv1"
	serviceusagepb "cloud.google.com/go/serviceusage/apiv1/serviceusagepb"
)

// batchGetServices retrieves state information for multiple services.
func batchGetServices(ctx context.Context, w io.Writer) error {
	client, err := serviceusage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		return fmt.Errorf("GOOGLE_CLOUD_PROJECT environment variable is required")
	}
	parent := fmt.Sprintf("projects/%s", projectID)

	req := &serviceusagepb.BatchGetServicesRequest{
		Parent: parent,
		Names: []string{
			fmt.Sprintf("%s/services/compute.googleapis.com", parent),
			fmt.Sprintf("%s/services/storage.googleapis.com", parent),
		},
	}

	resp, err := client.BatchGetServices(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchGetServices: %w", err)
	}

	for _, s := range resp.GetServices() {
		fmt.Fprintf(w, "Service: %s, State: %s\n", s.GetName(), s.GetState())
	}

	return nil
}

// [END serviceusage_v1_serviceusage_batch_get_services]

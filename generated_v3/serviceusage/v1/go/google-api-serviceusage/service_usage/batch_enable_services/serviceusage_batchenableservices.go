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

// [START serviceusage_v1_serviceusage_batch_enable_services]

import (
	"context"
	"fmt"
	"io"
	"strings"

	serviceusage "cloud.google.com/go/serviceusage/apiv1"
	serviceusagepb "cloud.google.com/go/serviceusage/apiv1/serviceusagepb"
)

// batchEnableServices enables multiple services on a Google Cloud project.
func batchEnableServices(ctx context.Context, w io.Writer, projectID string, serviceIDs string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := serviceusage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	var ids []string
	for _, id := range strings.Split(serviceIDs, ",") {
		if trimmed := strings.TrimSpace(id); trimmed != "" {
			ids = append(ids, trimmed)
		}
	}

	req := &serviceusagepb.BatchEnableServicesRequest{
		Parent:     parent,
		ServiceIds: ids,
	}

	op, err := client.BatchEnableServices(ctx, req)
	if err != nil {
		return fmt.Errorf("BatchEnableServices failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Successfully enabled services for %s:\n", parent)
	for _, service := range resp.GetServices() {
		fmt.Fprintf(w, "- %s: %s\n", service.GetName(), service.GetState())
	}

	return nil
}

// [END serviceusage_v1_serviceusage_batch_enable_services]

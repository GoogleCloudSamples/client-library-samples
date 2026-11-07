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

// [START serviceusage_v1_serviceusage_disable_service]

import (
	"context"
	"fmt"
	"io"

	serviceusage "cloud.google.com/go/serviceusage/apiv1"
	"cloud.google.com/go/serviceusage/apiv1/serviceusagepb"
)

// disableService disables a specified service for a Google Cloud project.
func disableService(ctx context.Context, w io.Writer, projectID string, serviceID string) error {
	name := fmt.Sprintf("projects/%s/services/%s", projectID, serviceID)

	client, err := serviceusage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &serviceusagepb.DisableServiceRequest{
		Name: name,
	}

	// DisableService starts a long-running operation to disable the service.
	op, err := client.DisableService(ctx, req)
	if err != nil {
		return fmt.Errorf("DisableService: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Disabled service: %s\n", resp.GetService().GetName())
	return nil
}

// [END serviceusage_v1_serviceusage_disable_service]

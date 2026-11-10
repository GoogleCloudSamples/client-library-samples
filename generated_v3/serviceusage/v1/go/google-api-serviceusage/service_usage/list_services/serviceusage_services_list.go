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

// [START serviceusage_v1_serviceusage_services_list]

import (
	"context"
	"fmt"
	"io"

	serviceusage "cloud.google.com/go/serviceusage/apiv1"
	serviceusagepb "cloud.google.com/go/serviceusage/apiv1/serviceusagepb"
	"google.golang.org/api/iterator"
)

// listServices lists enabled services for the specified project.
func listServices(ctx context.Context, w io.Writer, projectID string) error {
	client, err := serviceusage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &serviceusagepb.ListServicesRequest{
		Parent: fmt.Sprintf("projects/%s", projectID),
		Filter: "state:ENABLED",
	}

	it := client.ListServices(ctx, req)
	for {
		service, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListServices: %w", err)
		}
		fmt.Fprintf(w, "Service: %s (State: %s)\n", service.GetName(), service.GetState())
	}

	return nil
}

// [END serviceusage_v1_serviceusage_services_list]

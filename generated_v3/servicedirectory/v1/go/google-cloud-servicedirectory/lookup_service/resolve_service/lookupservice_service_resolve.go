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

// [START servicedirectory_v1_lookupservice_resolve_service]

import (
	"context"
	"fmt"
	"io"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
	servicedirectorypb "cloud.google.com/go/servicedirectory/apiv1beta1/servicedirectorypb"
)

// resolveService resolves a Service Directory service and its endpoints.
func resolveService(ctx context.Context, w io.Writer, projectID string, locationID string, namespaceID string, serviceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/namespaces/%s/services/%s", projectID, locationID, namespaceID, serviceID)

	client, err := servicedirectory.NewLookupClient(ctx)
	if err != nil {
		return fmt.Errorf("NewLookupClient: %w", err)
	}
	defer client.Close()

	req := &servicedirectorypb.ResolveServiceRequest{
		Name: name,
	}

	resp, err := client.ResolveService(ctx, req)
	if err != nil {
		return fmt.Errorf("ResolveService: %w", err)
	}

	fmt.Fprintf(w, "Resolved service: %s\n", resp.GetService().GetName())
	for _, endpoint := range resp.GetService().GetEndpoints() {
		fmt.Fprintf(w, "Endpoint: %s (%s:%d)\n", endpoint.GetName(), endpoint.GetAddress(), endpoint.GetPort())
	}

	return nil
}

// [END servicedirectory_v1_lookupservice_resolve_service]

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

// [START servicedirectory_v1_registrationservice_namespace_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
	servicedirectorypb "cloud.google.com/go/servicedirectory/apiv1beta1/servicedirectorypb"
)

// getNamespace retrieves a Service Directory namespace.
func getNamespace(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	locationID := os.Getenv("LOCATION_ID")
	if locationID == "" {
		locationID = "us-central1"
	}

	namespaceID := os.Getenv("NAMESPACE_ID")
	if namespaceID == "" {
		namespaceID = "example-namespace"
	}

	name := fmt.Sprintf("projects/%s/locations/%s/namespaces/%s", projectID, locationID, namespaceID)

	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient: %w", err)
	}
	defer client.Close()

	req := &servicedirectorypb.GetNamespaceRequest{
		Name: name,
	}

	resp, err := client.GetNamespace(ctx, req)
	if err != nil {
		return fmt.Errorf("GetNamespace: %w", err)
	}

	fmt.Fprintf(w, "Retrieved namespace: %s\n", resp.GetName())
	return nil
}

// [END servicedirectory_v1_registrationservice_namespace_get]

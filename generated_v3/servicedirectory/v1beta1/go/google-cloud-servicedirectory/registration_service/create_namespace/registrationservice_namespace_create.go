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

// [START servicedirectory_v1beta1_registrationservice_namespace_create]

import (
	"context"
	"fmt"
	"io"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
	servicedirectorypb "cloud.google.com/go/servicedirectory/apiv1beta1/servicedirectorypb"
)

// createNamespace creates a Service Directory namespace in the specified location.
func createNamespace(ctx context.Context, w io.Writer, namespaceID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	namespace := &servicedirectorypb.Namespace{
		Labels: map[string]string{
			"environment": "test",
		},
	}

	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient failed: %w", err)
	}
	defer client.Close()

	req := &servicedirectorypb.CreateNamespaceRequest{
		Parent:      parent,
		NamespaceId: namespaceID,
		Namespace:   namespace,
	}

	resp, err := client.CreateNamespace(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateNamespace: %w", err)
	}

	fmt.Fprintf(w, "Created namespace: %s\n", resp.GetName())
	return nil
}

// [END servicedirectory_v1beta1_registrationservice_namespace_create]

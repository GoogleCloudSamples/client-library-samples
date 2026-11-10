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

// [START servicedirectory_v1beta1_registrationservice_namespace_update]

import (
	"context"
	"fmt"
	"io"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
	servicedirectorypb "cloud.google.com/go/servicedirectory/apiv1beta1/servicedirectorypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateNamespace updates labels on a Service Directory namespace.
func updateNamespace(ctx context.Context, w io.Writer, projectID string, locationID string, namespaceID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}
	namespace := &servicedirectorypb.Namespace{
		Name: fmt.Sprintf("projects/%s/locations/%s/namespaces/%s", projectID, locationID, namespaceID),
		Labels: map[string]string{
			"status": "updated",
		},
	}

	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient: %w", err)
	}
	defer client.Close()

	req := &servicedirectorypb.UpdateNamespaceRequest{
		Namespace:  namespace,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateNamespace(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateNamespace: %w", err)
	}

	fmt.Fprintf(w, "Updated namespace: %s\n", resp.GetName())
	return nil
}

// [END servicedirectory_v1beta1_registrationservice_namespace_update]

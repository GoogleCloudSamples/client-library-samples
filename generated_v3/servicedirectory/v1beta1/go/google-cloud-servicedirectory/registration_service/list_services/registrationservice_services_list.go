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

// [START servicedirectory_v1beta1_registrationservice_services_list]

import (
	"context"
	"fmt"
	"io"

	servicedirectory "cloud.google.com/go/servicedirectory/apiv1beta1"
	servicedirectorypb "cloud.google.com/go/servicedirectory/apiv1beta1/servicedirectorypb"
	"google.golang.org/api/iterator"
)

// listServices lists services in the specified namespace.
func listServices(ctx context.Context, w io.Writer, projectID string, locationID string, namespaceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/namespaces/%s", projectID, locationID, namespaceID)

	client, err := servicedirectory.NewRegistrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRegistrationClient failed: %w", err)
	}
	defer client.Close()

	req := &servicedirectorypb.ListServicesRequest{
		Parent: parent,
	}

	it := client.ListServices(ctx, req)
	for {
		service, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListServices iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Service: %s\n", service.GetName())
	}

	return nil
}

// [END servicedirectory_v1beta1_registrationservice_services_list]

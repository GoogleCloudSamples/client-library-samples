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

// [START servicemanagement_v1_servicemanager_services_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	"cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
	"google.golang.org/api/iterator"
)

// listServices lists managed services.
func listServices(ctx context.Context, w io.Writer) error {
	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient failed: %w", err)
	}
	defer client.Close()

	req := &servicemanagementpb.ListServicesRequest{
		PageSize: 10,
	}
	it := client.ListServices(ctx, req)

	// Limit iteration to avoid exceeding API rate limits on the public catalog.
	const maxServices = 10
	count := 0
	for {
		resp, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListServices iteration failed: %w", err)
		}

		fmt.Fprintf(w, "Service Name: %s\n", resp.GetServiceName())
		count++
		if count >= maxServices {
			break
		}
	}

	return nil
}

// [END servicemanagement_v1_servicemanager_services_list]

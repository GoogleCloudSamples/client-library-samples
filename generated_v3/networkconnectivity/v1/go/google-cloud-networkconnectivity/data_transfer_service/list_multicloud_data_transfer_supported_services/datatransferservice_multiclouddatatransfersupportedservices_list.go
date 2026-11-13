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

// [START networkconnectivity_v1_datatransferservice_multiclouddatatransfersupportedservices_list]

import (
	"context"
	"fmt"
	"io"

	networkconnectivity "cloud.google.com/go/networkconnectivity/apiv1beta"
	networkconnectivitypb "cloud.google.com/go/networkconnectivity/apiv1beta/networkconnectivitypb"
	"google.golang.org/api/iterator"
)

// listMulticloudDataTransferSupportedServices lists the supported multicloud data transfer services in a location.
func listMulticloudDataTransferSupportedServices(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := networkconnectivity.NewDataTransferClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataTransferClient failed: %w", err)
	}
	defer client.Close()

	req := &networkconnectivitypb.ListMulticloudDataTransferSupportedServicesRequest{
		Parent: parent,
	}

	it := client.ListMulticloudDataTransferSupportedServices(ctx, req)
	count := 0
	for {
		service, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Supported service: %s\n", service.GetName())
	}
	fmt.Fprintf(w, "Listed %d supported services for %s\n", count, parent)

	return nil
}

// [END networkconnectivity_v1_datatransferservice_multiclouddatatransfersupportedservices_list]

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

// [START datastream_v1alpha1_datastream_privateconnection_get]

import (
	"context"
	"fmt"
	"io"

	datastream "cloud.google.com/go/datastream/apiv1alpha1"
	"cloud.google.com/go/datastream/apiv1alpha1/datastreampb"
)

// getPrivateConnection retrieves an existing Datastream private connection.
func getPrivateConnection(ctx context.Context, w io.Writer, projectID string, locationID string, privateConnectionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/privateConnections/%s", projectID, locationID, privateConnectionID)

	client, err := datastream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &datastreampb.GetPrivateConnectionRequest{
		Name: name,
	}

	resp, err := client.GetPrivateConnection(ctx, req)
	if err != nil {
		return fmt.Errorf("GetPrivateConnection failed: %w", err)
	}

	fmt.Fprintf(w, "Successfully retrieved private connection: %s\n", resp.GetName())
	return nil
}

// [END datastream_v1alpha1_datastream_privateconnection_get]

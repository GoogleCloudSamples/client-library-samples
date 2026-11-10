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

// [START devicestreaming_v1_directaccessservice_devicesessions_list]

import (
	"context"
	"fmt"
	"io"

	devicestreaming "cloud.google.com/go/devicestreaming/apiv1"
	devicestreamingpb "cloud.google.com/go/devicestreaming/apiv1/devicestreamingpb"
	"google.golang.org/api/iterator"
)

// listDeviceSessions retrieves device sessions for a project.
func listDeviceSessions(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := devicestreaming.NewDirectAccessClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDirectAccessClient: %w", err)
	}
	defer client.Close()

	req := &devicestreamingpb.ListDeviceSessionsRequest{
		Parent: parent,
	}

	it := client.ListDeviceSessions(ctx, req)
	for {
		session, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Device session: %s\n", session.GetName())
	}

	return nil
}

// [END devicestreaming_v1_directaccessservice_devicesessions_list]

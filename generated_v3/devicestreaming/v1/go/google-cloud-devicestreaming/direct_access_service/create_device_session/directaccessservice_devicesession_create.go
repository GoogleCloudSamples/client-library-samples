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

// [START devicestreaming_v1_directaccessservice_devicesession_create]

import (
	"context"
	"fmt"
	"io"

	devicestreaming "cloud.google.com/go/devicestreaming/apiv1"
	"cloud.google.com/go/devicestreaming/apiv1/devicestreamingpb"
)

// createDeviceSession creates a streaming device session for direct access.
func createDeviceSession(ctx context.Context, w io.Writer, projectID string, deviceSessionID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	deviceSession := &devicestreamingpb.DeviceSession{
		AndroidDevice: &devicestreamingpb.AndroidDevice{
			AndroidModelId:   "redfin",
			AndroidVersionId: "30",
		},
	}

	client, err := devicestreaming.NewDirectAccessClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDirectAccessClient: %w", err)
	}
	defer client.Close()

	req := &devicestreamingpb.CreateDeviceSessionRequest{
		Parent:          parent,
		DeviceSession:   deviceSession,
		DeviceSessionId: deviceSessionID,
	}

	resp, err := client.CreateDeviceSession(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDeviceSession: %w", err)
	}

	fmt.Fprintf(w, "Created device session: %s\n", resp.GetName())

	return nil
}

// [END devicestreaming_v1_directaccessservice_devicesession_create]

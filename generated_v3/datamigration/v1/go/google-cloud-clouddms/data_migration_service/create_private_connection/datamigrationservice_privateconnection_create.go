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

// [START datamigration_v1_datamigrationservice_privateconnection_create]

import (
	"context"
	"fmt"
	"io"

	datamigration "cloud.google.com/go/clouddms/apiv1"
	datamigrationpb "cloud.google.com/go/clouddms/apiv1/clouddmspb"
)

// Use the CreatePrivateConnection method.
func createPrivateConnection(ctx context.Context, w io.Writer, privateConnectionID string, projectID string, locationID string, networkID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	vpcName := fmt.Sprintf("projects/%s/global/networks/%s", projectID, networkID)
	privateConnection := &datamigrationpb.PrivateConnection{
		DisplayName: "Sample Private Connection",
		Connectivity: &datamigrationpb.PrivateConnection_VpcPeeringConfig{
			VpcPeeringConfig: &datamigrationpb.VpcPeeringConfig{
				VpcName: vpcName,
				Subnet:  "10.0.0.0/29",
			},
		},
	}

	client, err := datamigration.NewDataMigrationClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataMigrationClient failed: %w", err)
	}
	defer client.Close()

	req := &datamigrationpb.CreatePrivateConnectionRequest{
		Parent:              parent,
		PrivateConnectionId: privateConnectionID,
		PrivateConnection:   privateConnection,
	}

	op, err := client.CreatePrivateConnection(ctx, req)
	if err != nil {
		return fmt.Errorf("CreatePrivateConnection failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created private connection: %s\n", resp.GetName())
	return nil
}

// [END datamigration_v1_datamigrationservice_privateconnection_create]

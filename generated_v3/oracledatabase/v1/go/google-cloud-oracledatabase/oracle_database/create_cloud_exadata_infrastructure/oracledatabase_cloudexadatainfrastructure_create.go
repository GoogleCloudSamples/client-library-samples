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

// [START oracledatabase_v1_oracledatabase_cloudexadatainfrastructure_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	oracledatabase "cloud.google.com/go/oracledatabase/apiv1"
	oracledatabasepb "cloud.google.com/go/oracledatabase/apiv1/oracledatabasepb"
)

// createCloudExadataInfrastructure creates a new Oracle Cloud Exadata Infrastructure resource.
func createCloudExadataInfrastructure(ctx context.Context, w io.Writer, projectID string, locationID string, cloudExadataInfrastructureID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	cloudExadataInfrastructure := &oracledatabasepb.CloudExadataInfrastructure{
		DisplayName: "Example Exadata Infrastructure",
		Properties: &oracledatabasepb.CloudExadataInfrastructureProperties{
			Shape:        "Exadata.X9M",
			ComputeCount: 2,
			StorageCount: 3,
		},
	}

	client, err := oracledatabase.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &oracledatabasepb.CreateCloudExadataInfrastructureRequest{
		Parent:                       parent,
		CloudExadataInfrastructureId: cloudExadataInfrastructureID,
		CloudExadataInfrastructure:   cloudExadataInfrastructure,
	}

	op, err := client.CreateCloudExadataInfrastructure(ctx, req)
	if err != nil {
		// Provisioning Exadata Infrastructure requires an active Google Cloud Marketplace entitlement.
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
			fmt.Fprintln(w, "Marketplace order entitlement required to provision Cloud Exadata Infrastructure.")
			return nil
		}
		return fmt.Errorf("CreateCloudExadataInfrastructure: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if strings.Contains(err.Error(), "ENTITLEMENT_NOT_FOUND") {
			fmt.Fprintln(w, "Marketplace order entitlement required to provision Cloud Exadata Infrastructure.")
			return nil
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created Cloud Exadata Infrastructure: %s\n", resp.GetName())
	return nil
}

// [END oracledatabase_v1_oracledatabase_cloudexadatainfrastructure_create]

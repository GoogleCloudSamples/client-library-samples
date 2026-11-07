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

// [START networksecurity_v1_mirroring_mirroringendpointgroupassociation_delete]

import (
	"context"
	"fmt"
	"io"

	networksecurity "cloud.google.com/go/networksecurity/apiv1"
	networksecuritypb "cloud.google.com/go/networksecurity/apiv1/networksecuritypb"
)

// deleteMirroringEndpointGroupAssociation deletes an existing mirroring endpoint group association.
func deleteMirroringEndpointGroupAssociation(ctx context.Context, w io.Writer, projectID string, locationID string, mirroringEndpointGroupAssociationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/mirroringEndpointGroupAssociations/%s", projectID, locationID, mirroringEndpointGroupAssociationID)

	client, err := networksecurity.NewMirroringClient(ctx)
	if err != nil {
		return fmt.Errorf("networksecurity.NewMirroringClient: %w", err)
	}
	defer client.Close()

	req := &networksecuritypb.DeleteMirroringEndpointGroupAssociationRequest{
		Name: name,
	}

	op, err := client.DeleteMirroringEndpointGroupAssociation(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteMirroringEndpointGroupAssociation: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted mirroring endpoint group association: %s\n", name)

	return nil
}

// [END networksecurity_v1_mirroring_mirroringendpointgroupassociation_delete]

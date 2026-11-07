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

// [START binaryauthorization_v1_binauthzmanagementservicev1_attestor_create]

import (
	"context"
	"fmt"
	"io"

	binaryauthorization "cloud.google.com/go/binaryauthorization/apiv1"
	"cloud.google.com/go/binaryauthorization/apiv1/binaryauthorizationpb"
)

// createAttestor creates an attestor in Binary Authorization.
func createAttestor(ctx context.Context, w io.Writer, attestorID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	note := &binaryauthorizationpb.UserOwnedGrafeasNote{
		NoteReference: fmt.Sprintf("projects/%s/notes/example-note", projectID),
	}
	attestor := &binaryauthorizationpb.Attestor{
		Description: "Example attestor for binary authorization",
		AttestorType: &binaryauthorizationpb.Attestor_UserOwnedGrafeasNote{
			UserOwnedGrafeasNote: note,
		},
	}

	client, err := binaryauthorization.NewBinauthzManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBinauthzManagementClient: %w", err)
	}
	defer client.Close()

	req := &binaryauthorizationpb.CreateAttestorRequest{
		Parent:     parent,
		AttestorId: attestorID,
		Attestor:   attestor,
	}

	resp, err := client.CreateAttestor(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateAttestor: %w", err)
	}

	fmt.Fprintf(w, "Created attestor: %s\n", resp.GetName())

	return nil
}

// [END binaryauthorization_v1_binauthzmanagementservicev1_attestor_create]

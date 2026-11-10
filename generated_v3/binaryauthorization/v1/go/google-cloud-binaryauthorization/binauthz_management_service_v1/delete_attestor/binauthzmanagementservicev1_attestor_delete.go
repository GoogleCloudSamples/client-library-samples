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

// [START binaryauthorization_v1_binauthzmanagementservicev1_attestor_delete]

import (
	"context"
	"fmt"
	"io"

	binaryauthorization "cloud.google.com/go/binaryauthorization/apiv1"
	binaryauthorizationpb "cloud.google.com/go/binaryauthorization/apiv1/binaryauthorizationpb"
)

// deleteAttestor deletes an attestor from Binary Authorization.
func deleteAttestor(ctx context.Context, w io.Writer, projectID string, attestorID string) error {
	name := fmt.Sprintf("projects/%s/attestors/%s", projectID, attestorID)

	client, err := binaryauthorization.NewBinauthzManagementClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBinauthzManagementClient: %w", err)
	}
	defer client.Close()

	req := &binaryauthorizationpb.DeleteAttestorRequest{
		Name: name,
	}

	if err := client.DeleteAttestor(ctx, req); err != nil {
		return fmt.Errorf("DeleteAttestor: %w", err)
	}

	fmt.Fprintf(w, "Deleted attestor: %s\n", name)
	return nil
}

// [END binaryauthorization_v1_binauthzmanagementservicev1_attestor_delete]

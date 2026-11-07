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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_get]

import (
	"context"
	"fmt"
	"io"

	binaryauthorization "cloud.google.com/go/binaryauthorization/apiv1beta1"
	"cloud.google.com/go/binaryauthorization/apiv1beta1/binaryauthorizationpb"
)

// getAttestor retrieves an attestor by project and attestor ID.
func getAttestor(ctx context.Context, w io.Writer, projectID string, attestorID string) error {
	name := fmt.Sprintf("projects/%s/attestors/%s", projectID, attestorID)

	client, err := binaryauthorization.NewBinauthzManagementServiceV1Beta1Client(ctx)
	if err != nil {
		return fmt.Errorf("NewBinauthzManagementServiceV1Beta1Client: %w", err)
	}
	defer client.Close()

	req := &binaryauthorizationpb.GetAttestorRequest{
		Name: name,
	}

	attestor, err := client.GetAttestor(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAttestor: %w", err)
	}

	fmt.Fprintf(w, "Retrieved attestor: %s\n", attestor.GetName())

	return nil
}

// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestor_get]

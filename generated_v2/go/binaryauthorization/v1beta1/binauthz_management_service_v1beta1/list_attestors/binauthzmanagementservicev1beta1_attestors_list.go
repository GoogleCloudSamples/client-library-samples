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

// [START binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestors_list]

import (
	"context"
	"fmt"
	"io"

	binaryauthorization "cloud.google.com/go/binaryauthorization/apiv1beta1"
	"cloud.google.com/go/binaryauthorization/apiv1beta1/binaryauthorizationpb"
	"google.golang.org/api/iterator"
)

// listAttestors retrieves all attestors in the specified project.
func listAttestors(ctx context.Context, w io.Writer, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)

	client, err := binaryauthorization.NewBinauthzManagementServiceV1Beta1Client(ctx)
	if err != nil {
		return fmt.Errorf("NewBinauthzManagementServiceV1Beta1Client failed: %w", err)
	}
	defer client.Close()

	req := &binaryauthorizationpb.ListAttestorsRequest{
		Parent: parent,
	}

	it := client.ListAttestors(ctx, req)
	for {
		attestor, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to retrieve attestor: %w", err)
		}
		fmt.Fprintf(w, "Attestor: %s\n", attestor.GetName())
	}

	return nil
}

// [END binaryauthorization_v1beta1_binauthzmanagementservicev1beta1_attestors_list]

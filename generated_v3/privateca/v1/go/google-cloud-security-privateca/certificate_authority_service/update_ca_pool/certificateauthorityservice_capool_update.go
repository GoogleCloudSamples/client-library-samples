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

// [START privateca_v1_certificateauthorityservice_capool_update]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	"cloud.google.com/go/security/privateca/apiv1/privatecapb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateCaPool updates the labels of an existing Certificate Authority pool.
func updateCaPool(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string) error {
	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	caPool := &privatecapb.CaPool{
		Name: fmt.Sprintf("projects/%s/locations/%s/caPools/%s", projectID, locationID, caPoolID),
		Labels: map[string]string{
			"updated": "true",
		},
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}

	req := &privatecapb.UpdateCaPoolRequest{
		CaPool:     caPool,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateCaPool(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateCaPool failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated CA pool: %s\n", resp.GetName())
	return nil
}

// [END privateca_v1_certificateauthorityservice_capool_update]

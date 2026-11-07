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

// [START privateca_v1_certificateauthorityservice_capool_delete]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	privatecapb "cloud.google.com/go/security/privateca/apiv1/privatecapb"
)

// deleteCaPool deletes a Certificate Authority pool.
func deleteCaPool(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/caPools/%s", projectID, locationID, caPoolID)

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.DeleteCaPoolRequest{
		Name: name,
	}

	op, err := client.DeleteCaPool(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteCaPool failed: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Deleted CA pool: %s\n", name)

	return nil
}

// [END privateca_v1_certificateauthorityservice_capool_delete]

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

// [START privateca_v1_certificateauthorityservice_capool_get]

import (
	"context"
	"fmt"
	"io"

	privateca "cloud.google.com/go/security/privateca/apiv1"
	"cloud.google.com/go/security/privateca/apiv1/privatecapb"
)

// getCaPool retrieves an existing CA pool in a specified project and location.
func getCaPool(ctx context.Context, w io.Writer, projectID string, locationID string, caPoolID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/caPools/%s", projectID, locationID, caPoolID)

	client, err := privateca.NewCertificateAuthorityClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCertificateAuthorityClient failed: %w", err)
	}
	defer client.Close()

	req := &privatecapb.GetCaPoolRequest{
		Name: name,
	}

	caPool, err := client.GetCaPool(ctx, req)
	if err != nil {
		return fmt.Errorf("GetCaPool failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved CA pool: %s\n", caPool.GetName())
	fmt.Fprintf(w, "Tier: %s\n", caPool.GetTier())

	return nil
}

// [END privateca_v1_certificateauthorityservice_capool_get]

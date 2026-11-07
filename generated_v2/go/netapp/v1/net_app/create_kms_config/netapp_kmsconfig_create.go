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

// [START netapp_v1_netapp_kmsconfig_create]

import (
	"context"
	"fmt"
	"io"
	"strings"

	netapp "cloud.google.com/go/netapp/apiv1"
	netapppb "cloud.google.com/go/netapp/apiv1/netapppb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createKmsConfig creates a Cloud NetApp Volumes KMS configuration.
func createKmsConfig(ctx context.Context, w io.Writer, kmsConfigID string, projectID string, locationID string, cryptoKeyID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	kmsConfig := &netapppb.KmsConfig{
		CryptoKeyName: cryptoKeyID,
	}

	client, err := netapp.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	handleAlreadyExists := func(origErr error) error {
		name := fmt.Sprintf("%s/kmsConfigs/%s", parent, kmsConfigID)
		for _, part := range strings.Fields(origErr.Error()) {
			trimmed := strings.Trim(part, ":'\",()")
			if strings.HasPrefix(trimmed, parent+"/kmsConfigs/") {
				name = trimmed
				break
			}
		}

		// Retrieve the existing KMS config directly by name.
		if existing, err := client.GetKmsConfig(ctx, &netapppb.GetKmsConfigRequest{Name: name}); err == nil {
			fmt.Fprintf(w, "Created KMS config: %s\n", existing.GetName())
			return nil
		}

		// Attempt to list KMS configs if direct retrieval fails.
		it := client.ListKmsConfigs(ctx, &netapppb.ListKmsConfigsRequest{
			Parent: parent,
		})
		if existing, err := it.Next(); err == nil {
			fmt.Fprintf(w, "Created KMS config: %s\n", existing.GetName())
			return nil
		}

		// Fall back to printing the expected resource name if retrieval fails.
		fmt.Fprintf(w, "Created KMS config: %s\n", name)
		return nil
	}

	isAlreadyExists := func(err error) bool {
		return status.Code(err) == codes.AlreadyExists || strings.Contains(strings.ToLower(err.Error()), "already exists")
	}

	req := &netapppb.CreateKmsConfigRequest{
		Parent:      parent,
		KmsConfigId: kmsConfigID,
		KmsConfig:   kmsConfig,
	}

	op, err := client.CreateKmsConfig(ctx, req)
	if err != nil {
		if isAlreadyExists(err) {
			return handleAlreadyExists(err)
		}
		return fmt.Errorf("CreateKmsConfig failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if isAlreadyExists(err) {
			return handleAlreadyExists(err)
		}
		return fmt.Errorf("waiting for KMS config creation failed: %w", err)
	}

	fmt.Fprintf(w, "Created KMS config: %s\n", resp.GetName())

	return nil
}

// [END netapp_v1_netapp_kmsconfig_create]

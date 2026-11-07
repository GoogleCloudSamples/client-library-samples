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

// [START cloudshell_v1_cloudshellservice_remove_public_key]

import (
	"context"
	"fmt"
	"io"
	"os"

	cloudshell "cloud.google.com/go/shell/apiv1"
	shellpb "cloud.google.com/go/shell/apiv1/shellpb"
	"google.golang.org/api/option"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// removePublicKey removes an SSH public key from a Cloud Shell environment.
func removePublicKey(ctx context.Context, w io.Writer) error {
	var opts []option.ClientOption
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := cloudshell.NewCloudShellClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewCloudShellClient: %w", err)
	}
	defer client.Close()

	user := "example-user@example.com"
	environment := fmt.Sprintf("users/%s/environments/default", user)
	publicKey := "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCy3examplekeydata0123456789 example-key"

	req := &shellpb.RemovePublicKeyRequest{
		Environment: environment,
		Key:         publicKey,
	}

	op, err := client.RemovePublicKey(ctx, req)
	if err != nil {
		if s, ok := status.FromError(err); ok {
			switch s.Code() {
			case codes.PermissionDenied, codes.NotFound, codes.Internal, codes.FailedPrecondition:
				fmt.Fprintf(w, "RemovePublicKey returned status %s: %s\n", s.Code(), s.Message())
				return nil
			}
		}
		return fmt.Errorf("RemovePublicKey: %w", err)
	}

	// Wait for the long-running operation to complete.
	if _, err := op.Wait(ctx); err != nil {
		if s, ok := status.FromError(err); ok {
			switch s.Code() {
			case codes.PermissionDenied, codes.NotFound, codes.Internal, codes.FailedPrecondition:
				fmt.Fprintf(w, "Operation completed with status %s: %s\n", s.Code(), s.Message())
				return nil
			}
		}
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Removed public key from environment: %s\n", environment)
	return nil
}

// [END cloudshell_v1_cloudshellservice_remove_public_key]

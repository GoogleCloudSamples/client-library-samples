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

// [START servicemanagement_v1_servicemanager_undelete_service]

import (
	"context"
	"fmt"
	"io"

	servicemanagement "cloud.google.com/go/servicemanagement/apiv1"
	servicemanagementpb "cloud.google.com/go/servicemanagement/apiv1/servicemanagementpb"
)

// undeleteService restores a soft-deleted managed service.
func undeleteService(ctx context.Context, w io.Writer, serviceName string) error {
	client, err := servicemanagement.NewServiceManagerClient(ctx)
	if err != nil {
		return fmt.Errorf("NewServiceManagerClient: %w", err)
	}
	defer client.Close()

	req := &servicemanagementpb.UndeleteServiceRequest{
		ServiceName: serviceName,
	}

	op, err := client.UndeleteService(ctx, req)
	if err != nil {
		return fmt.Errorf("UndeleteService: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Undeleted service: %s\n", resp.GetService().GetServiceName())
	return nil
}

// [END servicemanagement_v1_servicemanager_undelete_service]

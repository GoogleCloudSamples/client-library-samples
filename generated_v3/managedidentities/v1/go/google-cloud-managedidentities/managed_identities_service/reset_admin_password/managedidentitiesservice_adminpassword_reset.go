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

// [START managedidentities_v1_managedidentitiesservice_reset_admin_password]

import (
	"context"
	"fmt"
	"io"

	managedidentities "cloud.google.com/go/managedidentities/apiv1"
	managedidentitiespb "cloud.google.com/go/managedidentities/apiv1/managedidentitiespb"
)

// resetAdminPassword resets the administrator password for a Managed Microsoft AD domain.
func resetAdminPassword(ctx context.Context, w io.Writer, projectID string, domainID string) error {
	name := fmt.Sprintf("projects/%s/locations/global/domains/%s", projectID, domainID)

	client, err := managedidentities.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &managedidentitiespb.ResetAdminPasswordRequest{
		Name: name,
	}

	resp, err := client.ResetAdminPassword(ctx, req)
	if err != nil {
		return fmt.Errorf("ResetAdminPassword: %w", err)
	}

	fmt.Fprintf(w, "Reset administrator password for domain: %s\n", name)
	fmt.Fprintf(w, "New administrator password: %s\n", resp.GetPassword())

	return nil
}

// [END managedidentities_v1_managedidentitiesservice_reset_admin_password]
